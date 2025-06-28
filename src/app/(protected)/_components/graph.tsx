"use client"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { graphType } from "@/_actions/get-graph-info"

export const description = "Relação de agendamentos por mês"

const chartConfig = {
    agendamentos: {
        label: "agendamentos",
    },
} satisfies ChartConfig

export function Graph({ graphInfos }: { graphInfos: graphType }) {

    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>Relação de agendamentos</CardTitle>
                <CardDescription>2025</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={graphInfos.chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="dia"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="agendamentos" fill="var(--color-desktop)" radius={8} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                    Agendamentos datados por mês <TrendingUp className="h-4 w-4" />
                </div>
            </CardFooter>
        </Card>
    )
}
