import { ReactDatePickerCustomHeaderProps } from "react-datepicker"
import NativeSelect from "../../molecules/native-select"
import { getYearRange, monthNames } from "./utils"

const CustomHeader = ({
  date,
  changeYear,
  changeMonth,
}: ReactDatePickerCustomHeaderProps) => {
  const month = date.getMonth()
  const monthName = monthNames[month]

  const year = date.getFullYear()
  return (
    <div className="flex items-center w-full gap-4">
      <div className="flex items-center justify-end flex-1 gap-3">
        <NativeSelect
          defaultValue={monthName}
          onValueChange={(v) => changeMonth(monthNames.indexOf(v))}
        >
          {monthNames.map((month) => (
            <NativeSelect.Item key={month} value={month}>
              {month}
            </NativeSelect.Item>
          ))}
        </NativeSelect>
      </div>
      <div className="flex items-center justify-start flex-1 gap-3">
        <NativeSelect
          defaultValue={year.toString()}
          onValueChange={(v) => changeYear(parseInt(v, 10))}
        >
          {getYearRange().map((year) => (
            <NativeSelect.Item key={year} value={year.toString()}>
              {year.toString()}
            </NativeSelect.Item>
          ))}
        </NativeSelect>
      </div>
    </div>
  )
}

export default CustomHeader
