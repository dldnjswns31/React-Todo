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

    // 같은 보드 내에서 이동
    if (destination?.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination.index, 0, draggableId);
        return { ...allBoards, [source.droppableId]: boardCopy };
      });
    }

    // 다른 보드 이동
    if (destination?.droppableId !== source.droppableId) {
      setToDos((allBoards) => {
        const sourceBoardCopy = [...allBoards[source?.droppableId]];
        const destinationBoardCopy = [...allBoards[destination?.droppableId]];

        sourceBoardCopy.splice(source.index, 1);
        destinationBoardCopy.splice(destination.index, 0, draggableId);
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
