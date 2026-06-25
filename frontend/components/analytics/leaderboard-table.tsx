import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { leaderboard } from "@/lib/mock-data"

export function LeaderboardTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Agent Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>Agent</TableHead>
              <TableHead className="text-right">Runs</TableHead>
              <TableHead className="text-right">Success</TableHead>
              <TableHead className="text-right">Avg time</TableHead>
              <TableHead className="text-right">Tokens</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboard.map((row) => (
              <TableRow key={row.rank}>
                <TableCell>
                  <span
                    className={cn(
                      "flex size-6 items-center justify-center rounded-md text-xs font-semibold tabular-nums",
                      row.rank === 1
                        ? "bg-amber-500/15 text-amber-500"
                        : row.rank <= 3
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground",
                    )}
                  >
                    {row.rank}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-base">{row.agentEmoji}</span>
                    <span className="font-medium">{row.agentName}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right tabular-nums">{row.runs.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <Badge variant={row.successRate >= 95 ? "secondary" : "outline"} className="tabular-nums">
                    {row.successRate}%
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-right tabular-nums">{row.avgTime}</TableCell>
                <TableCell className="text-muted-foreground text-right tabular-nums">{row.tokens}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
