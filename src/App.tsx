import React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { toDoState } from "./recoil/atoms";

const StWrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StBoards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`;

const StBoard = styled.div`
  min-height: 200px;
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${({ theme }) => theme.boardColor};
`;

const StCard = styled.div`
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${({ theme }) => theme.cardColor};
  border-radius: 5px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    // 제 자리에 둘 경우 destination이 없음.
    if (!destination) return;
    setToDos((oldToDos) => {
      const toDosCopy = [...oldToDos];
      toDosCopy.splice(source.index, 1);
      toDosCopy.splice(destination?.index, 0, draggableId);
      return toDosCopy;
    });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StWrapper>
        <StBoards>
          <Droppable droppableId="one">
            {(provided) => (
              <StBoard ref={provided.innerRef} {...provided.droppableProps}>
                {toDos.map((toDo, index) => (
                  <Draggable key={toDo} draggableId={toDo} index={index}>
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
                ))}
                {provided.placeholder}
              </StBoard>
            )}
          </Droppable>
        </StBoards>
      </StWrapper>
    </DragDropContext>
  );
}

export default App;
