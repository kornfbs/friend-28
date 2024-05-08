'use client'

import { Popover } from "@radix-ui/react-popover"
import { PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { useState } from "react"
import { DateRange } from "react-day-picker"
import { addDays, format } from "date-fns"
import { Calendar } from "../ui/calendar"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
  calc: number;
  allTx: Tx[];
  getRange: (args0: DateRange) => Promise<Tx[]>;
}

function ReportAllComponent({ getRange, calc, allTx }: Props) {

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2024, 4, 1),
    to: addDays(new Date(2024, 5, 1), 30),
  });
  const [returnTxs, setReturnTxs] = useState<Tx[]>(allTx);
  const [sum, setSum] = useState(calc);

  const okSearch = async () => {
    if(date?.from == null || date?.to == null) return
      const res = await getRange(date);
      setReturnTxs(res);
      const calc = res.reduce((acc, curr) => acc += curr.amount!, 0);
      setSum(calc);
  }
  return (
    <div>
      <div className="flex gap-2 p-3">
        <div className={cn("grid gap-2", "bg-white")}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "y-MM-dd")} :{" "}
                      {format(date.to, "y-MM-dd")}
                    </>
                  ) : (
                    format(date.from, "y-MM-dd")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
        <button className="bg-blue-700 text-white border-none outline-none rounded-md px-2" onClick={okSearch}>GO!</button>
      </div>


      {/* //table tx */}
      {returnTxs && (
        <div className='p-3'>
          <p className="text-xl mb-3"><span className="text-gray-500">{format(date?.from!, 'y-MM-dd')} </span> {`<->`} <span className="text-gray-500">{format(date?.to!, 'y-MM-dd')} </span></p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[30px] text-left">#</TableHead>
                <TableHead className="text-left">Name</TableHead>
                <TableHead className='text-left'>Transfer</TableHead>
                <TableHead className="text-left">Amount</TableHead>


              </TableRow>
            </TableHeader>
            <TableBody>
            <TableRow >
                <TableCell className="w-[30px] text-left text-sm font-light"></TableCell>
                <TableCell className="text-left text-sm font-light"></TableCell>
                <TableCell className="text-left">รวมยอด</TableCell>
                <TableCell className="text-right"> {(sum).toLocaleString()}
                </TableCell>
              </TableRow>
              {returnTxs.map((row, index) => (
                <TableRow key={row.id} >
                  <TableCell className="w-[30px] text-left text-sm font-light">{index + 1}</TableCell>
                  <TableCell className="text-left text-sm font-light">{row.name!}</TableCell>
                  <TableCell className="text-left text-sm font-light">{format(row.transfered_at!, 'y-MM-dd')}</TableCell>
                  <TableCell className="text-right text-sm font-light">{(row.amount!).toLocaleString()}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell className="w-[30px] text-left text-sm font-light"></TableCell>
                <TableCell className="text-left text-sm font-light"></TableCell>
                <TableCell className="text-left">ยอดรวม</TableCell>
                <TableCell className="text-right"> {(sum).toLocaleString()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

      )}
    </div>

  )
}

export default ReportAllComponent