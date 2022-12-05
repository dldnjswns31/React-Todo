import { Draggable } from "@hello-pangea/dnd";
import React from "react";
import styled from "styled-components";

interface IStCard {
  isDragging: boolean;
}

const StCard = styled.div<IStCard>`
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${({ theme, isDragging }) =>
    isDragging ? "#74b9ff" : theme.cardColor};
  box-shadow: ${({ isDragging }) =>
    isDragging ? "0px 2px 5px rgba(0,0,0,0.05)" : "none"};
  border-radius: 5px;
`;

interface IDragabbleCardProps {
  toDo: string;
  index: number;
}

const DragabbleCard = ({ toDo, index }: IDragabbleCardProps) => {
  return (
    <Draggable draggableId={toDo} index={index}>
      {(provided, snapshot) => (
        <StCard
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
        >
          {toDo}
        </StCard>
      )}
    </Draggable>
  );
};

export default React.memo(DragabbleCard);
