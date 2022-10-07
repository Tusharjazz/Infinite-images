const Lightbox = (props) => {
  return (
    <div className="lightbox" onClick={props.closeLightBox}>
      <img
        src={props?.image?.urls.small_s3 ?? ""}
        onClick={(e) => e.stopPropagation()}
      />
      <div
        className="close-lightbox lightbox-button"
        onClick={props.closeLightBox}
      >
        X
      </div>
      <div
        className="left-lightbox lightbox-button"
        onClick={(e) => {
          e.stopPropagation();
          props.onLeft();
        }}
      >
        {"<"}
      </div>
      <div
        className="right-lightbox lightbox-button"
        onClick={(e) => {
          e.stopPropagation();
          props.onRight();
        }}
      >
        {">"}
      </div>
    </div>
  );
};

export default Lightbox;
