import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { editCard } from "../features/cards/cards";

const CardModalDescription = ({card}) => {
  const dispatch = useDispatch();
  const [ originalCardDescription, setOriginalCardDescription ] = useState(card.description);
  const [ editedCardDescription, setEditedCardDescription ] = useState(card.description);
  const [ cardDescriptionEditable, setCardDescriptionEditable ] = useState(false);
  const [ cardDescriptionEditOptionsVisible, setCardDescriptionEditOptionsVisible ] = useState(false);
  const editOptionsClassName = cardDescriptionEditOptionsVisible ? '' : 'hidden';

  const toggleCardDescriptionEditable = () => {
    setCardDescriptionEditable(!cardDescriptionEditable);
  };

  const handleDescriptionInputChange = (event) => {
    setEditedCardDescription(event.target.value);
  };

  const handleEditDescription = () => {
    dispatch(editCard({cardId: card._id, card: {"description": editedCardDescription}}));
    setCardDescriptionEditable(false);
    setOriginalCardDescription(editedCardDescription);
  };

  const handleCancelEditing = () => {
    toggleCardDescriptionEditable();
    setCardDescriptionEditOptionsVisible(true);
  };

  const handleDiscardEdits = () => {
    setCardDescriptionEditOptionsVisible(false);
    setEditedCardDescription(card.description);
  }

  return (
    <form className="description">
      <p>Description</p>
      {cardDescriptionEditable ?
        <>
          <textarea onChange={handleDescriptionInputChange} className="textarea-toggle" rows="1" autoFocus value={editedCardDescription}>
          </textarea>
          <div>
            <div onClick={handleEditDescription} className="button" value="Save">
              Save
            </div>
            <i onClick={handleCancelEditing} className="x-icon icon"></i>
          </div>
        </> :
        <>
          <span onClick={toggleCardDescriptionEditable} id="description-edit" className="link">
            Edit
          </span>
          <p className="textarea-overlay">
            {originalCardDescription}
          </p>
          <p id="description-edit-options" className={editOptionsClassName}>
            You have unsaved edits on this field.{" "}
            <span className="link" onClick={toggleCardDescriptionEditable}>View edits</span> -{" "}
            <span className="link" onClick={handleDiscardEdits}>Discard</span>
          </p>
        </>
      }

    </form>
  //   <form className="description">
  //   <p>Description</p>
  //   <textarea className="textarea-toggle" rows="1" autoFocus>
  //     Cards have a symbol to indicate if they contain a description.
  //   </textarea>
  //   <div>
  //     <div className="button" value="Save">
  //       Save
  //     </div>
  //     <i className="x-icon icon"></i>
  //   </div>
  // </form>


  //   <form className="description">
  //     <p>Description</p>
      // <textarea onChange={handleDescriptionChange} className="textarea-toggle" rows="1" autoFocus value={cardDescription}>
      // </textarea>
      // <div>
      //   <div onClick={handleEditDescription} className="button" value="Save">
      //     Save
      //   </div>
      //   <i className="x-icon icon"></i>
      // </div>
  //   </form>
  );
};

export default CardModalDescription;
