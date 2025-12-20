import { fetchDeviceStatus, postDeviceCommand, DeviceStatus } from '../../app/services/mockApi';

export interface WaterStatus extends DeviceStatus {
  usage: number[];
}

export const getWaterStatus = async (): Promise<WaterStatus> => {
  const status = await fetchDeviceStatus();
  return {
    ...status,
    usage: [320, 280, 210, 260, 190, 300, 360],
  };
};

export const toggleMotor = async (motorOn: boolean) => {
  return postDeviceCommand({ motorOn });
};

