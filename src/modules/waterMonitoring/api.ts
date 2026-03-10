export interface WaterStatus {
  waterLevel: number;
  volumeLiters: number;
  distanceFromBottomCm: number;
  motorOn: boolean;
  lastUpdated: string;
  usage: number[];
}

const BASE_URL = "http://192.168.1.54:5000"; // 🔥 Replace with your Mac IP

export const getWaterStatus = async (): Promise<WaterStatus> => {
  try {
    const response = await fetch(`${BASE_URL}/api/water`);
    const data = await response.json();

    const percentage = data.percentage ?? 0;

    const tankCapacityLiters = 1000; // change if needed
    const tankHeightCm = 30;

    return {
      waterLevel: percentage,
      volumeLiters: Math.round((percentage / 100) * tankCapacityLiters),
      distanceFromBottomCm: Math.round((percentage / 100) * tankHeightCm),
      motorOn: false, // we can connect this later
      lastUpdated: new Date().toISOString(),
      usage: [20, 35, 40, 60, 50, 70, percentage], // temporary chart
    };
  } catch (error) {
    console.log("Water API Error:", error);

    return {
      waterLevel: 0,
      volumeLiters: 0,
      distanceFromBottomCm: 0,
      motorOn: false,
      lastUpdated: new Date().toISOString(),
      usage: [0, 0, 0, 0, 0, 0, 0],
    };
  }
};

export const toggleMotor = async (motorOn: boolean) => {
  try {
    await fetch(`${BASE_URL}/api/motor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ motorOn }),
    });
  } catch (error) {
    console.log("Motor Toggle Error:", error);
  }
};
