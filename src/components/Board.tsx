import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import styled from "styled-components";
import DragabbleCard from "./DragabbleCard";

const StBoard = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  min-height: 300px;
  padding: 10px 0px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
`;
const StTitle = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface IStAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

const StArea = styled.div<IStAreaProps>`
  padding: 20px;
  background-color: ${({ isDraggingOver, isDraggingFromThis }) =>
    isDraggingOver
      ? "#dfe6e9"
      : isDraggingFromThis
      ? "#b2bec3"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.1s ease-in;
`;

interface IBoardProps {
  toDos: string[];
  boardId: string;
}

const Board = ({ toDos, boardId }: IBoardProps) => {
  return (
    <StBoard>
      <StTitle>{boardId}</StTitle>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <StArea
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DragabbleCard key={toDo} index={index} toDo={toDo} />
            ))}
            {provided.placeholder}
          </StArea>
        )}
      </Droppable>
    </StBoard>
  );
};

export default Board;
