import React from "react";
import styled from "styled-components";

const Tooltip = ({children}) => {
  return (
    <StyledWrapper>
      <div className="tooltip-container">
        <span className="tooltip">Uiverse.io</span>
        <span className="text">{children}</span>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .tooltip-container {
  position: relative;
  transition: all 0.2s;
  font-size: 17px;
  width: fit-content;
  box-sizing: border-box;
  --bg: linear-gradient(135deg, #a940fd, #5b46e8);
  --color: #fff;
  --tooltip-bg: #303030;
  --tooltip-color: #fff;
  --margin: 0.5rem;
}

.text {
  z-index: 9;
}

.tooltip {
  position: absolute;
  top: calc(-1 * var(--margin));
  left: 50%;
  transform: translateX(-50%) translateY(0%) scale(0);
  padding: 0.3em 0.6em;
  opacity: 0;
  pointer-events: none;
  transition: all 0.2s;
  background: var(--tooltip-bg);
  color: var(--tooltip-color);
  border-radius: 0.5rem;
  z-index: 99999;
}

.tooltip::before {
  position: absolute;
  content: "";
  height: 0.6em;
  width: 0.6em;
  bottom: -0.2em;
  left: 50%;
  transform: translate(-50%) rotate(45deg);
  background: var(--tooltip-bg);
  border-bottom-right-radius: 0.175rem;
}

.tooltip-container:hover .tooltip {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: translateX(-50%) translateY(-100%) scale(1);
}

`;

export default Tooltip;
