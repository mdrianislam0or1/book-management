
export const Table = ({ children }: { children: React.ReactNode }) => {
  return (
    <table className="min-w-full bg-white border border-gray-300 divide-y divide-gray-200">{children}</table>
  );
};


export const TableHead = ({ children }: { children: React.ReactNode }) => {
  return <th className="py-2 px-4 font-semibold text-left">{children}</th>;
};



export const TableRow = ({ children }: { children: React.ReactNode }) => {
  return <tr>{children}</tr>;
};



export const TableHeader = ({ children }: { children: React.ReactNode }) => {
  return <thead className="bg-gray-50">{children}</thead>;
};



export const TableCell = ({ children }: { children: React.ReactNode }) => {
  return <td className="py-2 px-4">{children}</td>;
};

export const TableBody = ({ children }: { children: React.ReactNode }) => {
  return <tbody className="divide-y divide-gray-200">{children}</tbody>;
};

