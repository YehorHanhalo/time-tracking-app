export interface ITimerecord {
  enddate: string;
  notes: string;
  running: boolean;
  startdate: string;
  timespent: number;
  task?: {
    id: string;
  };
  contact: {
    fullname: string;
  };
}

export interface ITask {
  id: string;
  name: string;
  timerecords: ITimerecord[];
  taskTotalTimespent: number;
}