import { PoolClient } from "pg";

export interface ScheduleRow {
    id: number;
    status: string;
}

export async function findScheduleById(
    client: PoolClient,
    scheduleId: number
): Promise<ScheduleRow | null> {
    const { rows } = await client.query<ScheduleRow>(
        "SELECT id, status FROM schedules WHERE id = $1",
        [scheduleId]
    );
    return rows[0] ?? null;
}
