export interface ScheduleType {
    userId: string,
    id?: string,
    title: string,
    start: string,
    end: string,
    content: string,
    participant: string,
    backgroundColor: string
    allDay?: boolean,
}
