export interface ITask{
    id:string;
    title:string;
    description:string;
    status: "OPEN" | "IN PROGRESS" | "DONE"
}