"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@components/ui/badge";
import { Checkbox } from "@components/ui/checkbox";

import { statuses } from "../data/data";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { IFeedback } from "@type/feedbacks";
import { timeYmd } from "@util/dateTime";
import { store } from "@toolkit/store";
import Link from "next/link";

// 테이블의 컬럼과 셀 정의
export const columns: ColumnDef<IFeedback>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "thumbnail",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="썸네일" />
    ),
    cell: ({ row }) => (
      <div className="w-[50px]">
        <picture>
          <source srcSet={row.getValue("thumbnail")} type="image/jpg" />
          <img
            src={row.getValue("thumbnail")}
            alt="thumbnail"
            width={80}
            height={80}
          />
        </picture>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "genre",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="장르" />
    ),
    cell: ({ row }) => {
      return (
        <Link href={`/feedbacks/${row.original.id}`} className="flex space-x-2">
          <Badge variant="outline" className="flex-shrink-0">
            {row.getValue("genre")}
          </Badge>
        </Link>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="제목" />
    ),
    cell: ({ row }) => {
      return (
        <Link href={`/feedbacks/${row.original.id}`} className="flex space-x-2">
          <span className="min-w-[160px] max-w-[500px] font-medium">
            {row.getValue("title")}
          </span>
        </Link>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "nickname",
    header: ({ column }) => {
      const isDancer = store.getState().auth.isDancer;

      return (
        <DataTableColumnHeader
          column={column}
          title={isDancer ? "댄서블" : "댄서"}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <Link href={`/feedbacks/${row.original.id}`} className="flex w-[80px] items-center">
          <span>{row.getValue("nickname")}</span>
        </Link>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="상태" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      return (
        <Link href={`/feedbacks/${row.original.id}`} className="flex w-[80px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </Link>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
  },
  {
    accessorKey: "createDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="날짜" />
    ),
    cell: ({ row }) => {
      return (
        <Link href={`/feedbacks/${row.original.id}`} className="flex space-x-2">
          <span>{timeYmd(row.getValue("createDate"))}</span>
        </Link>
      );
    },
  },
  // 더보기 버튼의 구성요소
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions feedbackId={row.original.id} />
    )
  },
];
