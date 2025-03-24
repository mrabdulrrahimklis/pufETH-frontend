import type { ITransaction } from "~/routes/home/types/transaction";
import { intlDateTimeFormat } from "~/utils/intlDateTimeFormat";

export const TableItem = ({ item }: { item: ITransaction }) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {item.id}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {intlDateTimeFormat(item.createdAt)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{item.ethAmount}</td>
      <td className="px-6 py-4 whitespace-nowrap">{item.amount}</td>
    </tr>
  );
};
