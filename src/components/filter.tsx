import { Button, TextField } from "@mui/material";

export interface FilterData {
  date: string;
  sourceId: string;
  sourceName: string;
}

export interface FilterProps {
  filter: FilterData;
  setFilter: (props: FilterData) => void;
  handleFiltering: (page: number) => void;
}

/**
 * Component for filtering data.
 * 
 * @param filter - The filter data object.
 * @param setFilter - Function to set filter data.
 * @param handleFiltering - Function to handle filtering.
 */
const Filter = ({ filter, setFilter, handleFiltering }: FilterProps) => {
  return (
    <>
      <TextField
        id="date"
        name="date"
        type="date"
        value={filter.date}
        onChange={(e) => setFilter({ ...filter, date: e.target.value })}
      />
      <TextField
        sx={{ marginTop: "10px" }}
        id="sourceId"
        name="sourceId"
        label="Source Id"
        value={filter.sourceId}
        onChange={(e) => setFilter({ ...filter, sourceId: e.target.value })}
      />
      <TextField
        sx={{ marginTop: "10px" }}
        id="sourceName"
        name="sourceName"
        label="Source Name"
        value={filter.sourceName}
        onChange={(e) => setFilter({ ...filter, sourceName: e.target.value })}
      />
      <Button
        sx={{ marginTop: "20px" }}
        variant="contained"
        onClick={() => handleFiltering(1)}
      >
        Filter
      </Button>
    </>
  );
};

export default Filter;
