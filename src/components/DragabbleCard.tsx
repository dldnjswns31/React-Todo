import { Draggable } from "@hello-pangea/dnd";
import React from "react";
import styled from "styled-components";

const StCard = styled.div`
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${({ theme }) => theme.cardColor};
  border-radius: 5px;
`;

interface IDragabbleCardProps {
  toDo: string;
  index: number;
}

const DragabbleCard = ({ toDo, index }: IDragabbleCardProps) => {
  return (
    <Draggable draggableId={toDo} index={index}>
      {(provided) => (
        <StCard
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {toDo}
        </StCard>
      )}
    </Draggable>
  );
};

export default React.memo(DragabbleCard);
