import React from "react";
import Section, { SECTION_DEFAULT_PROPS, SECTION_PROP_TYPES } from "./Sections";
import { getWrapperClasses, getBackgroundClasses, getElemClasses } from "./sections_utilities/GetClasses";

// TODO: Chapter backgrounds are depreciated and can be removed

function Chapter({ children, type, wrapperClassName, background, id, name, margin }) {
  var pref = "chapter";

  var wrapperClasses = getWrapperClasses(wrapperClassName, pref);
  var backgroundClasses = getBackgroundClasses(pref, background);
  var elemClasses = getElemClasses(pref, type);

  var lastChildHasBackground = false;

  
  if (typeof children === "undefined") children = [<></>];
  if (children.length > 0) {
    var lastChild = children[children.length - 1];
    if (lastChild.props.background != undefined && lastChild.props.background != null && lastChild.props.background != "" && lastChild.props.background != "none") {
      lastChildHasBackground = true;
    }
  }
  
  // Clone the children array so that we can modify it without affecting the original
  var newChildren = React.Children.toArray(children);
  if (!Array.isArray(newChildren)) newChildren = [newChildren];
  
  // Add a wrapper class to each child that has a background color, so that we can add padding to the bottom of the child
  newChildren = newChildren.map((child, i) => {
    if (i < children.length - 1) {
      var nextSibling = children[i + 1];
      var nextSiblingBackground = nextSibling.props.background;
      if (nextSiblingBackground && nextSiblingBackground !== "none") {
        const wrapperClassName = child.props.wrapperClassName ? `${child.props.wrapperClassName} pb-section-gap` : 'pb-section-gap';
        return React.cloneElement(child, { wrapperClassName });
      }
    }
    return child;
  });
    
  newChildren = newChildren.map((child, i) => {
    if (i != newChildren.length - 1) return child;
    if (!child.props.background || child.props.background != "none") return child;
    const wrapperClassName = child.props.wrapperClassName ? `${child.props.wrapperClassName} pb-section-gap` : 'pb-section-gap';
    return React.cloneElement(child, { wrapperClassName });
  });
    

  return (
    <div id={id} className={`${wrapperClasses} ${backgroundClasses} ${lastChildHasBackground ? "pb-0" : ""}`} name={name ? name : ""}>
      <div className={elemClasses}>{newChildren}</div>
    </div>
  );
}

Chapter.defaultProps = SECTION_DEFAULT_PROPS;
Chapter.propTypes = SECTION_PROP_TYPES;

export default Chapter;
