//удаляет точку DELETE
import {RouteService} from "@/modules/routing";

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ pointId: string }> }
) {
    const { pointId } = await params;

    await RouteService.deletePoint(pointId);

    return new Response(null, { status: 204 });
}