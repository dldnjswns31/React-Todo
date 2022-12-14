import { Draggable } from "react-beautiful-dnd";
import React from "react";
import styled, { css } from "styled-components";

interface IStCard {
  isDragging: boolean;
  draggingOver?: string;
}

const StCard = styled.div<IStCard>`
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${({ theme, isDragging }) =>
    isDragging ? "#74b9ff" : theme.cardColor};
  box-shadow: ${({ isDragging }) =>
    isDragging ? "0px 2px 5px rgba(0,0,0,0.05)" : "none"};
  border-radius: 5px;

  ${({ draggingOver }) =>
    draggingOver === "trashcan"
      ? css`
          background-color: #ff7979;
        `
      : null}
`;

interface IDragabbleCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

const DragabbleCard = ({ toDoId, toDoText, index }: IDragabbleCardProps) => {
  return (
    <Draggable draggableId={String(toDoId)} index={index}>
      {(provided, snapshot) => {
        return (
          <StCard
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            isDragging={snapshot.isDragging}
            draggingOver={snapshot.draggingOver}
          >
            {toDoText}
          </StCard>
        );
      }}
    </Draggable>
  );
};

export default React.memo(DragabbleCard);
