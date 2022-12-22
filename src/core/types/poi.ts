export type PoiState = {
  points: PoiData[];
  selectedPoi: PoiData | null;
}


export type AddressInfo = {
  AddressLine1: string
  CountryID: number,
  Distance: number
  DistanceUnit: number,
  ID: number,
  Latitude: number
  Longitude: number
  Postcode: string,
  StateOrProvince: string,
  Title: string
  Town: string
}

export type Connection = {
    Amps: 30,
    ConnectionTypeID: 1,
    CurrentTypeID: 10,
    ID: 136172,
    LevelID: 2,
    PowerKW: 6.6,
    Quantity: 4,
    StatusTypeID: 50,
    Voltage: 240,
}

export type PoiData = {
  AddressInfo: AddressInfo;
  Connections: Connection[];
  DataProviderID: number;
  DataQualityLevel: number,
  DateCreated: string;
  DateLastStatusUpdate: string;
  DateLastVerified: string;
  ID: number;
  IsRecentlyVerified: boolean;
  NumberOfPoints: number;
  OperatorID: number;
  StatusTypeID: number;
  SubmissionStatusTypeID: number;
  UUID: string;
  UsageCost: string;
  UsageTypeID: number;
}
