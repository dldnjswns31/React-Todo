import React from "react";
import { useForm } from "react-hook-form";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragabbleCard from "./DragabbleCard";
import { ITodo, toDoState } from "../recoil/atoms";
import { useSetRecoilState } from "recoil";

const StBoard = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  min-height: 300px;
  margin: 10px;
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

const StForm = styled.form`
  width: 100%;
  padding: 0px 20px;

  input {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
  }
`;

interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
  index: number;
}

interface IForm {
  toDo: string;
}

const Board = ({ toDos, boardId, index }: IBoardProps) => {
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoState);
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((current) => {
      return {
        ...current,
        [boardId]: [...current[boardId], newToDo],
      };
    });
    setValue("toDo", "");
  };
  return (
    <Draggable draggableId={boardId} index={index}>
      {(provided) => (
        <StBoard
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <StTitle>{boardId}</StTitle>
          <StForm onSubmit={handleSubmit(onValid)}>
            <input
              type="text"
              placeholder={`${boardId} 적기`}
              {...register("toDo", { required: true })}
            />
          </StForm>
          <Droppable droppableId={boardId}>
            {(provided, snapshot) => (
              <StArea
                isDraggingOver={snapshot.isDraggingOver}
                isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {toDos.map((toDo, index) => (
                  <DragabbleCard
                    key={toDo.id}
                    index={index}
                    toDoId={toDo.id}
                    toDoText={toDo.text}
                  />
                ))}
                {provided.placeholder}
              </StArea>
            )}
          </Droppable>
        </StBoard>
      )}
    </Draggable>
  );
};

export default React.memo(Board);
