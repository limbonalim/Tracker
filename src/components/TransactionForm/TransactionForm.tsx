

const TransactionForm = () => {
  return (
    <form>
      <div className="mb-3">
        <label htmlFor="type" className="form-label">Type:</label>
        <select
          id="type"
          name="type"
          className="form-select"
          required
        >
          <option selected>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">Category:</label>
        <select
          id="category"
          name="category"
          className="form-select"
          required
        >
          <option selected>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <label htmlFor="amount" className="form-label">Amount:</label>
      <div className="input-group mb-3">
        <input
          id="amount"
          name="amount"
          type="number"
          className="form-control"
          required
        />
          <span className="input-group-text">KGS</span>
      </div>
      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-outline-success">Add</button>
        <button type="button" className="btn btn-outline-secondary">Cancel</button>
      </div>
    </form>
  );
};

export default TransactionForm;