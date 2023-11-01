import { useState } from 'react';

function BucketForm(props) {
  // State for input and eagerness level
  const [input, setInput] = useState('');
  let [eagerness, setEagerness] = useState('');

  // Array of eagerness levels
  const eagernessLevel = ['high', 'medium', 'low'];

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!eagerness) {
      eagerness = 'low'; // Default to 'low' if no eagerness level is selected
    }

    // Call the onSubmit function from props with the new item's data
    props.onSubmit({
      id: Math.random(Math.floor() * 1000), // Generate a random ID
      text: input,
      eagerness: eagerness,
    });

    // Clear input fields
    setInput('');
    setEagerness('');
  };

  // Function to handle input field changes
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  // Conditional rendering: if the "edit" prop exists, render the update form; otherwise, render the normal form
  return !props.edit ? (
    <div>
      <form className="bucket-form" onSubmit={handleSubmit}>
        {/* Input field for the task */}
        <input
          type="text"
          placeholder="Add to your bucket list"
          value={input}
          name="text"
          className="bucket-input"
          onChange={handleChange}
        ></input>
        <div className="dropdown">
          {/* Dropdown button to select priority */}
          <button className={`dropbtn ${eagerness}`}>
            {eagerness || 'Priority'}
          </button>
          <div className="dropdown-content">
            {/* Priority options with onClick handlers to set eagerness level */}
            <p onClick={() => setEagerness(eagernessLevel[0])}>Must do</p>
            <p onClick={() => setEagerness(eagernessLevel[1])}>Want to do</p>
            <p onClick={() => setEagerness(eagernessLevel[2])}>Take it or leave it</p>
          </div>
        </div>
        {/* Button to add the bucket list item */}
        <button className="bucket-button">Add bucket list item</button>
      </form>
    </div>
  ) : (
    <div>
      {/* If the "edit" prop exists, render the update form with the current value */}
      <h3>Update entry: {props.edit.value}</h3>
      <form className="bucket-form" onSubmit={handleSubmit}>
        {/* Input field with the current value as a placeholder */}
        <input
          type="text"
          placeholder={props.edit.value}
          value={input}
          name="text"
          className="bucket-input"
          onChange={handleChange}
        ></input>
        <div className="dropdown">
          {/* Dropdown button to select priority */}
          <button className={`dropbtn ${eagerness}`}>
            {eagerness || 'Priority'}
          </button>
          <div className="dropdown-content">
            {/* Priority options with onClick handlers to set eagerness level */}
            <p onClick={() => setEagerness(eagernessLevel[0])}>Must do</p>
            <p onClick={() => setEagerness(eagernessLevel[1])}>Want to do</p>
            <p onClick={() => setEagerness(eagernessLevel[2])}>Take it or leave it</p>
          </div>
        </div>
        {/* Button to update the item */}
        <button className="bucket-button">Update</button>
      </form>
    </div>
  );
}

export default BucketForm;
