export const TableHead = ({ headItems }: { headItems: string[] }) => {
  return (
    <thead className="bg-gray-50">
      <tr>
        {headItems.map((item, index) => (
          <th
            key={index}
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {item}
          </th>
        ))}
      </tr>
    </thead>
  );
};
