
"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

function TimeScroll({
  label,
  value,
  onChange,
  range,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  range: number[]
}) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-xs text-muted-foreground">{label}</span>
      <ScrollArea className="h-40 w-16 border rounded-md">
        {range.map((num) => (
          <div
            key={num}
            className={`p-2 text-center cursor-pointer hover:bg-muted ${
              value === num ? "bg-primary text-white" : ""
            }`}
            onClick={() => onChange(num)}
          >
            {String(num).padStart(2, "0")}
          </div>
        ))}
      </ScrollArea>
    </div>
  )
}

export function DateTimeRangePicker({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
}: {
  startDate: Date | undefined
  setStartDate: (date: Date | undefined) => void
  endDate: Date | undefined
  setEndDate: (date: Date | undefined) => void
  startTime: string
  setStartTime: (t: string) => void
  endTime: string
  setEndTime: (t: string) => void
}) {
  const [startHour, setStartHour] = React.useState(Number(startTime.split(":")[0]))
  const [startMinute, setStartMinute] = React.useState(Number(startTime.split(":")[1]))
  const [endHour, setEndHour] = React.useState(Number(endTime.split(":")[0]))
  const [endMinute, setEndMinute] = React.useState(Number(endTime.split(":")[1]))

  React.useEffect(() => {
    setStartTime(`${String(startHour).padStart(2, "0")}:${String(startMinute).padStart(2, "0")}`)
  }, [startHour, startMinute])

  React.useEffect(() => {
    setEndTime(`${String(endHour).padStart(2, "0")}:${String(endMinute).padStart(2, "0")}`)
  }, [endHour, endMinute])

  const handleSetToNow = () => {
    const now = new Date()
    setEndDate(now)
    setEndHour(now.getHours())
    setEndMinute(now.getMinutes())
  }

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Start Picker */}
      <div className="flex flex-col gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[250px] justify-start text-left">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {startDate
                ? `Start: ${format(startDate, "PPP")} - ${startTime}`
                : "Pick start datetime"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2">
            <div className="flex gap-4 items-start">
              <Calendar mode="single" selected={startDate} onSelect={setStartDate} />
              <div className="flex gap-2">
                <TimeScroll
                  label="Hour"
                  value={startHour}
                  onChange={setStartHour}
                  range={[...Array(24).keys()]}
                />
                <TimeScroll
                  label="Minute"
                  value={startMinute}
                  onChange={setStartMinute}
                  range={[...Array(60).keys()]}
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* End Picker */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[250px] justify-start text-left">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate
                  ? `End: ${format(endDate, "PPP")} - ${endTime}`
                  : "Pick end datetime"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2">
              <div className="flex gap-4 items-start">
                <Calendar mode="single" selected={endDate} onSelect={setEndDate} />
                <div className="flex gap-2">
                  <TimeScroll
                    label="Hour"
                    value={endHour}
                    onChange={setEndHour}
                    range={[...Array(24).keys()]}
                  />
                  <TimeScroll
                    label="Minute"
                    value={endMinute}
                    onChange={setEndMinute}
                    range={[...Array(60).keys()]}
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Set to Now Button */}
          <Button variant="secondary" onClick={handleSetToNow}>
            Set to Now
          </Button>
        </div>
      </div>
    </div>
  )
}
