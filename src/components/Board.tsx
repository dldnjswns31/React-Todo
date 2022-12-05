import React from "react";
import { useForm } from "react-hook-form";
import { Droppable } from "@hello-pangea/dnd";
import styled from "styled-components";
import DragabbleCard from "./DragabbleCard";
import { ITodo, toDoState } from "../recoil/atoms";
import { useSetRecoilState } from "recoil";

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

const StForm = styled.form`
  width: 100%;
`;

const StInput = styled.input`
  width: 100%;
`;

interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
}

interface IForm {
  toDo: string;
}

const Board = ({ toDos, boardId }: IBoardProps) => {
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
    <StBoard>
      <StTitle>{boardId}</StTitle>
      <StForm onSubmit={handleSubmit(onValid)}>
        <StInput
          type="text"
          placeholder={`Add task on ${boardId}`}
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
  );
};

export default Board;
