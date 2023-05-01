import { splitS } from "@/scripts/GlobalUtilities";

function VideoGraphic(elem, group = null) {
  this.elem = elem.closest(".graphic--video");
  this.video = this.getVideo();
  this.transition = this.getTransitionDuration();
  this.autoplay = this.getAutoplayValue();
  this.sync = this.getSyncValue();
  this.playObserver = null;
  this.is = {
    staggered: this.checkIfStaggered(),
    sync: Boolean(this.sync),
    inView: false,
    loop: this.checkIfLoop(),
    hoverAutoPlay: this.checkIfHoverAutoplay(),
    scrollAutoPlay: this.checkIfScrollAutoplay(),
  };
  this.get = {
    loopingGroup: () => {
      const isLoopingGroup = this.group.filter((g) => g.is.loop).length == this.group.length;

      if (isLoopingGroup) {
        this.is.loopingGroup = true;
        this.group.forEach((g) => {
          g.is.loopingGroup = true;
          g.getVideo().removeAttribute("loop");
        });
      } else {
        this.is.loopingGroup = false;
        this.group.forEach((g) => {
          g.is.loopingGroup = false;
          var loop = g.getVideo().getAttribute("data-loop") == "true";
          if (loop) g.getVideo().setAttribute("loop", "true");
          if (!loop) g.getVideo().removeAttribute("loop");
        });
      }
    },
    hoverAutoPlay: () => {
      const isHoverAutoPlay = this.checkIfHoverAutoplay();
      this.is.hoverAutoPlay = isHoverAutoPlay;
    },
  };
  this.set = {
    hoverAutoPlay: () => {
      if (this.is.hoverAutoPlay) {
        this.elem.setAttribute("data-autoplay-hover", "true");
      } else {
        this.elem.setAttribute("data-autoplay-hover", "false");
      }
    },
  };
  this.group = this.getGroup(group);
  this.index = this.getIndex();

  this.set.hoverAutoPlay();
}

VideoGraphic.prototype.getVideo = function () {
  const video = this.elem.querySelector("video");
  return video;
};

VideoGraphic.prototype.getTransitionDuration = function () {
  const transitionDuration = getComputedStyle(this.elem).transitionDuration;
  if (transitionDuration && transitionDuration !== "0s") {
    return splitS(transitionDuration);
  } else {
    return splitS(getComputedStyle(document.documentElement).getPropertyValue("--transition").trim());
  }
};

VideoGraphic.prototype.getAutoplayValue = function () {
  const ap = this.video.getAttribute("data-autoplay") || false;
  return ap;
};

VideoGraphic.prototype.getSyncValue = function () {
  return this.elem.getAttribute("data-sync") || false;
};

VideoGraphic.prototype.getGroup = function (group) {
  if (typeof this.sync === "string") {
    return group || Array.from(document.querySelectorAll(`[data-sync="${this.sync}"]`));
  } else {
    return group || [this.elem];
  }
};

VideoGraphic.prototype.getIndex = function () {
  return this.group.indexOf(this.elem);
};

VideoGraphic.prototype.checkIfStaggered = function () {
  return typeof this.autoplay === "string" && this.autoplay.includes("staggered");
};

VideoGraphic.prototype.checkIfLoop = function () {
  const loop = this.video.hasAttribute("data-loop") && this.video.getAttribute("data-loop") !== "false";
  return loop;
};

VideoGraphic.prototype.checkIfHoverAutoplay = function () {
  const isHoverAutoPlay = typeof this.autoplay === "string" && this.autoplay.includes("hover");
  return isHoverAutoPlay;
};

VideoGraphic.prototype.checkIfScrollAutoplay = function () {
  return typeof this.autoplay === "string" && this.autoplay.includes("scroll");
};

export default VideoGraphic;