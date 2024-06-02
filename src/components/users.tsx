import { Box, Button } from "@mui/material";
import { useState, useEffect } from "react";

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import DoNotDisturbOffIcon from '@mui/icons-material/DoNotDisturbOff';
import {
    GridRowsProp,
    GridRowModesModel,
    GridRowModes,
    DataGrid,
    GridColDef,
    GridToolbarContainer,
    GridActionsCellItem,
    GridEventListener,
    GridRowId,
    GridRowModel,
    GridRowEditStopReasons,
    GridSlots,
} from '@mui/x-data-grid';
import {
    randomId,
} from '@mui/x-data-grid-generator';

import { blockUnblockUsers, createUsers, getUsers, updateUsers } from "../services";


interface EditToolbarProps {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
        newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
    ) => void;
}

interface GridRow {
    id: number;
    isNew: boolean;
    first_name: string;
    last_name: string;
    email: string;
    keyword_quota: number;
    status: string;
}


function EditToolbar(props: EditToolbarProps) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
        const id = randomId();
        setRows((oldRows) => [...oldRows, { id, first_name: '', last_name: '', email: '', isNew: true, keyword_quota: 0, status: 'active' }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                Add User
            </Button>
        </GridToolbarContainer>
    );
}

const Users: React.FC = () => {
    const [rows, setRows] = useState<GridRow[]>([]);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const [statusUpdated, setStatusUpdated] = useState<Boolean>(false);

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleBlockClick = (id: GridRowId) => () => {
        blockUnblockUsers({ id, status: 'blocked'}).then();
        setStatusUpdated(statusUpdated ? false : true);
    };

    const handleUnblockClick = (id: GridRowId) => () => {
        blockUnblockUsers({ id, status: 'active'}).then();
        setStatusUpdated(statusUpdated ? false : true);
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow!.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow: GridRowModel) => {
        try {
            if (newRow.isNew) {
                newRow['password'] = randomId();
                createUsers(newRow).then();
            } else {
                updateUsers(newRow).then();
            }
        } catch (e:any) {
            alert(e.message);
        }
        const updatedRow = { ...newRow, isNew: false };
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns: GridColDef[] = [
        { field: 'first_name', headerName: 'First name', width: 100, editable: true, headerAlign: 'left' },
        { field: 'last_name', headerName: 'Last name', width: 100, editable: true, headerAlign: 'left' },
        { field: 'email', headerName: 'Email', width: 140, editable: true, headerAlign: 'left' },
        { field: 'keyword_quota', headerName: 'Keyword Quota', width: 130, editable: true, type: 'number', headerAlign: 'left', align: 'left' },
        { field: 'status', headerName: 'Status', width: 100, editable: false, headerAlign: 'left' },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id, row }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    row.status === 'active' ? <GridActionsCellItem
                        icon={<DoNotDisturbOnIcon />}
                        label="Block"
                        onClick={handleBlockClick(id)}
                        color="inherit"
                    /> : <GridActionsCellItem
                        icon={<DoNotDisturbOffIcon />}
                        label="Unblock"
                        onClick={handleUnblockClick(id)}
                        color="inherit"
                    />
                ];
            },
        },
    ];

    useEffect(() => {
        getUsers().then((response) => {
            setRows(response);
        });
    }, [statusUpdated]);

    return (
        <Box
            sx={{
                height: '50%',
                width: '50%',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
            }}
        >
            <DataGrid
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{
                    toolbar: EditToolbar as GridSlots['toolbar'],
                }}
                slotProps={{
                    toolbar: { setRows, setRowModesModel },
                }}
            />
        </Box>
    );
}

export default Users;
