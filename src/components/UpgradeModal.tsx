import React, { useEffect } from "react";

type IndexType = {
  horizontal: number;
  vertical: number;
  pion: string | null;
};

type PropsType = {
  isOpen: boolean;
  current: IndexType | null;
  setCurrent: (value: IndexType | null) => void;
  setIsOpen: (value: boolean) => void;
  setIndex: React.Dispatch<React.SetStateAction<IndexType[][]>>;
};

const UpgradeModal: React.FC<PropsType> = (props) => {
  useEffect(() => {}, [props.isOpen]);
  if (!props.isOpen) return null;

  const upgradeHandle = (code: string) => {
    props.setIndex((previndex) =>
      previndex.map((indexRow) =>
        indexRow.map((index) =>
          index.vertical === props.current?.vertical &&
          index.horizontal === props.current.horizontal
            ? { ...index, pion: code }
            : index
        )
      )
    );
  };

  const toUpgrade = (code: number) => {
    const pion = props.current?.pion || "";
    const player = pion.replace(/[^0-9]/g, "");
    switch (code) {
      case 1:
        upgradeHandle("Q" + player);
        break;
      case 2:
        upgradeHandle("B" + player);
        break;
      case 3:
        upgradeHandle("Kn" + player);
        break;
      case 4:
        upgradeHandle("R" + player);
        break;
    }
    props.setCurrent(null);
    props.setIsOpen(false);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="relative p-4 w-full max-w-md max-h-full mx-auto my-auto  z-10">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-lg font-semibold text-gray-900">
              Upgrade Pawn
            </h3>
          </div>
          <div className="space-y-4 p-4 md:p-5">
            <p className="text-gray-500">Select your pawn upgrade:</p>
            <ul className="space-y-4 mb-4">
              <li>
                <button
                  type="button"
                  onClick={() => toUpgrade(1)}
                  className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100"
                >
                  <div className="block">
                    <div className="w-full text-lg font-semibold">Queen</div>
                  </div>
                  <svg
                    className="w-6 h-6 ms-3 rtl:rotate-180 text-gray-900"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 -960 960 960"
                  >
                    <path d="M280-160v-80h400v80H280Zm160-160v-327L336-544l-56-56 200-200 200 200-56 56-104-103v327h-80Z" />
                  </svg>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => toUpgrade(2)}
                  className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100"
                >
                  <div className="block">
                    <div className="w-full text-lg font-semibold">Bishop</div>
                  </div>
                  <svg
                    className="w-6 h-6 ms-3 rtl:rotate-180 text-gray-900"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 -960 960 960"
                  >
                    <path d="M280-160v-80h400v80H280Zm160-160v-327L336-544l-56-56 200-200 200 200-56 56-104-103v327h-80Z" />
                  </svg>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => toUpgrade(3)}
                  className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100"
                >
                  <div className="block">
                    <div className="w-full text-lg font-semibold">Knight</div>
                  </div>
                  <svg
                    className="w-6 h-6 ms-3 rtl:rotate-180 text-gray-900"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 -960 960 960"
                  >
                    <path d="M280-160v-80h400v80H280Zm160-160v-327L336-544l-56-56 200-200 200 200-56 56-104-103v327h-80Z" />
                  </svg>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => toUpgrade(4)}
                  className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100"
                >
                  <div className="block">
                    <div className="w-full text-lg font-semibold">Rook</div>
                  </div>
                  <svg
                    className="w-6 h-6 ms-3 rtl:rotate-180 text-gray-900"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 -960 960 960"
                  >
                    <path d="M280-160v-80h400v80H280Zm160-160v-327L336-544l-56-56 200-200 200 200-56 56-104-103v327h-80Z" />
                  </svg>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradeModal;
