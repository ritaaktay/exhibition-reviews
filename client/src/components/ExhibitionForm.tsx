import LocationSelect from "./LocationSelect";

type Props = {
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  title: string;
};

const ExhibitionForm = ({
  setLocation,
  setTitle,
  title,
}: Props): JSX.Element => {
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onChangeLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  return (
    <div>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          value={title}
          onChange={onChangeTitle}
          required
        />
      </div>
      <div className="form-group">
        <label>Location</label>
        <LocationSelect setLocation={onChangeLocation} />
      </div>
    </div>
  );
};

export default ExhibitionForm;
