import React from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { IToDoState, toDoState } from "./recoil/atoms";
import Board from "./components/Board";

const StWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
`;

const StBoards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState<IToDoState>(toDoState);
  const onDragEnd = (info: DropResult) => {
    const { destination, draggableId, source } = info;
    if (!destination) return;
    console.log(info);

    if (destination.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObject = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination.index, 0, taskObject);
        return { ...allBoards, [source.droppableId]: boardCopy };
      });
    }

    if (destination?.droppableId !== source.droppableId) {
      setToDos((allBoards) => {
        const sourceBoardCopy = [...allBoards[source.droppableId]];
        const taskObject = sourceBoardCopy[source.index];
        const destinationBoardCopy = [...allBoards[destination.droppableId]];

        sourceBoardCopy.splice(source.index, 1);
        destinationBoardCopy.splice(destination.index, 0, taskObject);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoardCopy,
          [destination.droppableId]: destinationBoardCopy,
        };
      });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StWrapper>
        <StBoards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </StBoards>
      </StWrapper>
    </DragDropContext>
  );
}

export default App;
