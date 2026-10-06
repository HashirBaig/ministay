import type { ReactNode } from "react";

type PropsWithChildren = {
  children: ReactNode;
};

function LayoutCard({ children }: PropsWithChildren) {
  return (
    <div className="bg-green-50/90 backdrop-blur-xs w-full rounded-xl mt-8 p-5 sm:flex sm:flex-col sm:grow sm:h-fit">
      {children}
    </div>
  );
}

export default LayoutCard;
