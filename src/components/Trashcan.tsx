import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled, { css, keyframes } from "styled-components";
import { BsTrash2Fill } from "react-icons/bs";

const trashcanShake = keyframes`
    25% {
        transform: rotate(10deg);
    }
    50% {
        transform: rotate(0);
    }
    75% {
        transform: rotate(-10deg);
    }
    100% {
        transform: rotate(0);
    }
`;

const StWrapper = styled.div<{ isDraggingOver: boolean }>`
  position: absolute;
  right: 50px;
  bottom: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  background-color: white;
  border-radius: 50%;
  font-size: 32px;
  color: #3f8cf2;
  transition: all 0.1s ease-in;

  ${({ isDraggingOver }) =>
    isDraggingOver
      ? css`
          animation: ${trashcanShake} 0.2s infinite alternate;
          width: 128px;
          height: 128px;
          font-size: 64px;
        `
      : null}
`;

const Trashcan = () => {
  return (
    <Droppable droppableId="trashcan">
      {(provided, snapshot) => {
        return (
          <StWrapper
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            <BsTrash2Fill />
          </StWrapper>
        );
      }}
    </Droppable>
  );
};

export default Trashcan;
