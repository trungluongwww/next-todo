import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { ITodoItem } from '@/interfaces/todo';
import { useTodoContext } from '@/providers/TodoContextProvider';

const defaultInputs = {
  name: '',
  dueDate: new Date(),
  description: '',
  isCompleted: false
};

interface IModalAddTodoItemProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  data: ITodoItem;
}

export default function TodoUpdateModal({
  isOpen,
  setIsOpen,
  data
}: IModalAddTodoItemProps) {
  const todoContext = useTodoContext();

  const [inputs, setInputs] = useState<ITodoItem>({
    ...data
  });

  const handleInputsChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let value: string | Date;
    switch (evt.target.name) {
      case 'dueDate':
        value = new Date(evt.target.value);
        break;
      default:
        value = evt.target.value;
    }

    setInputs((pre) => {
      return { ...pre, [evt.target.name]: value };
    });
  };

  const handleUpdateItem = () => {
    todoContext?.updateTodoItem(inputs);

    setInputs({ ...defaultInputs });

    setIsOpen(false);
  };

  const handleRestoreItem = () => {
    todoContext?.updateTodoItem({ ...inputs, isCompleted: false });

    setInputs({ ...defaultInputs });

    setIsOpen(false);
  };

  const handleDeleteItem = () => {
    todoContext?.removeTodoItem(inputs.id || '');

    setIsOpen(true);
  };

  return (
    <div
      className={`absolute left-0 top-0 z-50 h-screen w-screen overflow-hidden bg-black bg-opacity-30 ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      <div
        className={
          'bordershadow mx-auto mt-[100px] max-w-[550px] rounded-xl border-gray-400 bg-white'
        }
      >
        <form>
          <div className={' space-y-1  border-b border-[#e6e6e6]  p-4 '}>
            <input
              type="text"
              className={
                'w-full overflow-ellipsis text-2xl font-bold outline-none'
              }
              placeholder={'Task name'}
              name={'name'}
              value={inputs.name}
              onChange={(e) => handleInputsChange(e)}
            />
            <textarea
              name={'description'}
              placeholder={'Description'}
              rows={10}
              value={inputs.description}
              className={'max-h-[550px] w-full resize-none outline-none'}
              onChange={(e) => handleInputsChange(e)}
            />
            <div className={'space-x-2 text-base'}>
              <p className={'text-gray inline'}> Due date</p>
              <input
                name={'dueDate'}
                className={'rounded-md border border-gray-400 p-1 outline-none'}
                type={'date'}
                value={new Date(inputs.dueDate).toISOString().split('T')[0]}
                onChange={(e) => handleInputsChange(e)}
              />
            </div>
          </div>
          <div className={'flex justify-between p-4'}>
            {/*  TODO: modify priority*/}
            <select className={'p-2'}>
              <option value="0">Priority</option>
            </select>
            <div className={'space-x-2'}>
              <button
                className={
                  'rounded-md bg-gray-300 p-2 font-semibold text-black hover:shadow'
                }
                type={'button'}
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              {data.isCompleted && (
                <button
                  className={
                    'rounded-md bg-gray-300 p-2 font-semibold text-black hover:shadow'
                  }
                  type={'button'}
                  onClick={handleRestoreItem}
                >
                  Restore
                </button>
              )}
              <button
                className={
                  'rounded-md bg-red-800 p-2 font-semibold text-white hover:shadow'
                }
                type={'button'}
                onClick={handleDeleteItem}
              >
                Delete
              </button>
              <button
                className={
                  'rounded-md bg-amber-700 p-2 font-semibold text-white hover:shadow'
                }
                type={'button'}
                onClick={handleUpdateItem}
              >
                Apply change
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
