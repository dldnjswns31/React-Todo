import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { BsTrash2Fill } from "react-icons/bs";

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
  transition: all 0.2s ease-in;

  transform: ${({ isDraggingOver }) => (isDraggingOver ? "scale(2)" : "none")};
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
