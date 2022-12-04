import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

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

const toDos = ["a", "b", "c", "d", "e", "f"];

function App() {
  const onDragEnd = () => {};
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StWrapper>
        <StBoards>
          <Droppable droppableId="one">
            {(provided) => (
              <StBoard ref={provided.innerRef} {...provided.droppableProps}>
                {toDos.map((toDo, index) => (
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
                ))}
              </StBoard>
            )}
          </Droppable>
        </StBoards>
      </StWrapper>
    </DragDropContext>
  );
}

export default App;
