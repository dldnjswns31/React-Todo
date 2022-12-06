import React, { useState } from "react";
import styled from "styled-components";
import { HiPlus } from "react-icons/hi";
import { GrFormClose } from "react-icons/gr";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../recoil/atoms";

const StAddButton = styled.button`
  position: absolute;
  top: 50px;
  right: 50px;
  width: 64px;
  height: 64px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background-color: white;

  &:active {
    transform: scale(0.9);
  }
`;

const StModalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 5;
`;

const StModal = styled.div`
  position: relative;
  width: 300px;
  height: 150px;
  background-color: ${({ theme }) => theme.boardColor};
  border-radius: 5px;

  div {
    width: 100%;
    padding: 10px 0;
    margin-bottom: 35px;
    background-color: white;
    border-radius: 5px 5px 0 0;
    font-size: 18px;
    font-weight: 700;
    text-align: center;
  }

  input {
    width: calc(100% - 40px);
    margin: 0 20px;
    padding: 10px;
    border: none;
    border-radius: 5px;
  }
`;

const StCloseButton = styled.button`
  position: absolute;
  top: 10px;
  left: 20px;
  width: 20px;
  height: 20px;
  background-color: #ff7979;
  border: none;
  border-radius: 50%;
  cursor: pointer;

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

interface IForm {
  title: string;
}

const BoardAdd = () => {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const setToDos = useSetRecoilState(toDoState);

  const handleButtonClick = () => {
    setIsModalOpen((prev) => !prev);
  };

  const onValid = ({ title }: IForm) => {
    setToDos((allBoards) => {
      const boardTitle = Object.keys(allBoards);
      const newBoard = Object.assign(
        {},
        ...boardTitle.map((key) => ({ [key]: allBoards[key] })),
        { [title]: [] }
      );
      console.log(newBoard);
      return newBoard;
    });
    setValue("title", "");
    setIsModalOpen((prev) => !prev);
  };

  return (
    <>
      <StAddButton onClick={handleButtonClick}>
        <HiPlus strokeWidth={2} color="#3f8cf2" size={32} />
      </StAddButton>
      {isModalOpen ? (
        <StModalBackground
          onClick={() => {
            setIsModalOpen((prev) => !prev);
          }}
        >
          <StModal
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <StCloseButton onClick={handleButtonClick}>
              <GrFormClose color="white" />
            </StCloseButton>
            <div>보드 제목</div>
            <form onSubmit={handleSubmit(onValid)}>
              <input {...register("title", { required: true })} autoFocus />
            </form>
          </StModal>
        </StModalBackground>
      ) : null}
    </>
  );
};

export default BoardAdd;
