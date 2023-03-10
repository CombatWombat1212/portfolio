import { defaultProps, PropTypes } from "prop-types";

function getAdditionalHeadingClassesFromParentProps(childs, reason) {
  function addClass(obj) {
    var copy = { ...obj };
    copy.props = { ...obj.props };
    var className = copy.props.className ? copy.props.className : "";
    if (reason == "titled above") copy.props.className = `${className} section--heading__title-above`;
    return copy;
  }
  var childsCopy = childs;
  for (var i = 0; i < childs.heading.length; i++) {
    childsCopy.heading[i] = addClass(childs.heading[i]);
  }
  for (var i = 0; i < childs.columns.length; i++) {
    for (var j = 0; j < childs.columns[i].heading.length; j++) {
      childsCopy.columns[i].heading[j] = addClass(childs.columns[i].heading[j]);
    }
  }
  return childsCopy;
}

function getHeadingClasses(type) {
  var headingClasses = "";
  if (type == "h1") headingClasses += " text--h1";
  if (type == "h2") headingClasses += " text--h2";
  if (type == "h3") headingClasses += " text--h3";
  if (type == "h4") headingClasses += " text--h4";
  if (type == "h5") headingClasses += " text--h5";
  if (type == "p") headingClasses += " text--body";
  return headingClasses;
}

function Heading({ children, type, className }) {
  var headingClasses = getHeadingClasses(type);

  return (
    <div className={`section--heading ${headingClasses} ${className ? className : ""}`}>
      {type == "h1" && <h1>{children}</h1>}
      {type == "h2" && <h2>{children}</h2>}
      {type == "h3" && <h3>{children}</h3>}
      {type == "h4" && <h4>{children}</h4>}
      {type == "h5" && <h5>{children}</h5>}
      {type == "p" && <p>{children}</p>}
    </div>
  );
}

Heading.defaultProps = {
  type: "h2",
};

Heading.propTypes = {
  type: PropTypes.oneOf(["h1", "h2", "h3", "h4","h5", "p"]),
};

export default Heading;
export { Heading, getAdditionalHeadingClassesFromParentProps };
