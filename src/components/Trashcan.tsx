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

const StWrapper = styled.div`
  position: absolute;
  right: 50px;
  bottom: 50px;
  display: flex;
  align-items: center;

  span {
    margin-right: 20px;
    color: white;
    font-size: 18px;
    font-weight: 500;
  }
`;

const StTrashcan = styled.div<{ isDraggingOver: boolean }>`
  display: inline-flex;
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
          <StWrapper>
            <span>삭제할 카드는 여기 버려주세요!</span>
            <StTrashcan
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              <BsTrash2Fill />
            </StTrashcan>
          </StWrapper>
        );
      }}
    </Droppable>
  );
};

export default Trashcan;
