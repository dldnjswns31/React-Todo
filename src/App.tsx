import React from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { IToDoState, toDoState } from "./recoil/atoms";
import Board from "./components/Board";
import Trashcan from "./components/Trashcan";

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
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`;

function App() {
  const [toDos, setToDos] = useRecoilState<IToDoState>(toDoState);
  const onDragEnd = (info: DropResult) => {
    const { destination, source, type } = info;
    if (!destination) return;
    if (type === "container") {
      setToDos((allBoards) => {
        const boardName = Object.keys(allBoards);
        const draggedBoardName = boardName[source.index];

        boardName.splice(source.index, 1);
        boardName.splice(destination.index, 0, draggedBoardName);

        const newBoardObj = Object.assign(
          {},
          ...boardName.map((key) => ({ [key]: allBoards[key] }))
        );

        return newBoardObj;
      });
      return;
    }
    if (type !== "container") {
      if (destination.droppableId === "trashcan") {
        setToDos((allBoards) => {
          const boardCopy = [...allBoards[source.droppableId]];
          boardCopy.splice(source.index, 1);
          return { ...allBoards, [source.droppableId]: boardCopy };
        });
        return;
      }

      if (destination.droppableId === source.droppableId) {
        setToDos((allBoards) => {
          const boardCopy = [...allBoards[source.droppableId]];
          const taskObject = boardCopy[source.index];
          boardCopy.splice(source.index, 1);
          boardCopy.splice(destination.index, 0, taskObject);
          return { ...allBoards, [source.droppableId]: boardCopy };
        });
        return;
      }

      if (destination.droppableId !== source.droppableId) {
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
        return;
      }
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StWrapper>
        <Droppable
          droppableId="container"
          direction="horizontal"
          type="container"
        >
          {(provided) => {
            return (
              <StBoards ref={provided.innerRef} {...provided.droppableProps}>
                {Object.keys(toDos).map((boardId, index) => (
                  <Board
                    boardId={boardId}
                    key={boardId}
                    toDos={toDos[boardId]}
                    index={index}
                  />
                ))}
                {provided.placeholder}
              </StBoards>
            );
          }}
        </Droppable>
        <Trashcan />
      </StWrapper>
    </DragDropContext>
  );
}

export default App;
