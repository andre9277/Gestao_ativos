const ConfigDropAdd = ({ Title, id, setData, setNewData }) => {
  return (
    <div id="container-config">
      <form className="frm-cats">
        <label htmlFor={id} className="lb-cats">
          Nome:
        </label>
        <input
          type="text"
          value={setData}
          onChange={(e) => setNewData(e.target.value)}
          autoComplete="off"
        />
      </form>
    </div>
  );
};

export default ConfigDropAdd;
