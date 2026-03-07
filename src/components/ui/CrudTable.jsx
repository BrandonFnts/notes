import { useMemo } from 'react';
import { Table, Tag, Typography, Space, Button, Popconfirm, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

// ── Column type renderers ────────────────────────────────────
const renderers = {
  text: (value) => value,
  secondary: (value) => <Typography.Text type="secondary">{value}</Typography.Text>,
  bold: (value) => <span style={{ fontWeight: 600 }}>{value}</span>,
  date: (value) => (
    <Typography.Text type="secondary">
      {value ? new Date(value).toLocaleDateString() : '—'}
    </Typography.Text>
  ),
  tags: (tags) => (
    <Space size={4} wrap>
      {Array.isArray(tags) && tags.length > 0
        ? tags.map(t => <Tag key={t.id}>{t.name}</Tag>)
        : <Typography.Text type="secondary" style={{ fontSize: 12 }}>—</Typography.Text>
      }
    </Space>
  ),
  color: (value) => (
    <div
      style={{
        width: 24,
        height: 24,
        borderRadius: '50%',
        backgroundColor: value || '#ccc',
        border: '1px solid #d9d9d9',
      }}
    />
  ),
};

/**
 * Converts a simplified column config into a full Ant Design column.
 *
 * Shorthand format:
 *   { field: 'title', title: 'Title', type: 'bold' }
 *   { field: 'createdAt', title: 'Date', type: 'date' }
 *   { field: 'tags', title: 'Tags', type: 'tags' }
 *   { field: 'color', title: 'Color', type: 'color' }
 *   { field: 'content', title: 'Content', type: 'secondary', ellipsis: true }
 *
 * You can still pass a custom `render` function to override the type renderer.
 */
const buildColumn = ({ field, title, type = 'text', render, ...rest }) => ({
  title,
  dataIndex: field,
  key: field,
  render: render || renderers[type] || renderers.text,
  ...rest,
});

/**
 * Reusable CRUD Table wrapper around Ant Design's Table.
 * Pure presentation — data and loading state come from the parent Controller.
 *
 * @param {Array}    props.columns      - Simplified column configs (see buildColumn).
 * @param {Array}    props.dataSource   - Row data (from useQuery in the parent).
 * @param {boolean}  props.loading      - Loading state (from useMonitor in the parent).
 * @param {Object}   [props.actionConfig] - { view, edit, delete } toggles for the actions column.
 * @param {Object|false} [props.pagination] - Ant Design pagination config, or false to disable.
 * @param {Function} [props.onView]     - Callback when clicking View.
 * @param {Function} [props.onEdit]     - Callback when clicking Edit.
 * @param {Function} [props.onDelete]   - Callback when clicking Delete (after confirm).
 * @param {string}   [props.rowKey]     - Unique row key field (default: 'id').
 */
const defaultPagination = {
  pageSize: 10,
  showSizeChanger: true,
  pageSizeOptions: ['10', '20', '50'],
  showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
};

export const CrudTable = ({
  columns,
  dataSource,
  loading = false,
  actionConfig,
  pagination,
  onView,
  onEdit,
  onDelete,
  rowKey = 'id',
  ...restProps
}) => {
  const finalColumns = useMemo(() => {
    const built = columns.map(buildColumn);

    if (!actionConfig) return built;

    const actionColumn = {
      title: 'Actions',
      key: 'actions',
      width: 120,
      fixed: 'right',
      render: (_, record) => (
        <Space size="small" onClick={(e) => e.stopPropagation()}>
          {actionConfig.view && (
            <Tooltip>
              <Button
                type="text"
                size="small"
                icon={<EyeOutlined style={{ color: '#1890FF' }} />}
                onClick={() => onView?.(record)}
              />
            </Tooltip>
          )}

          {actionConfig.edit && (
            <Tooltip>
              <Button
                type="text"
                size="small"
                icon={<EditOutlined style={{ color: '#5D5FDA' }} />}
                onClick={() => onEdit?.(record)}
              />
            </Tooltip>
          )}

          {actionConfig.delete && (
            <Popconfirm
              title="Delete this record?"
              onConfirm={() => onDelete?.(record)}
              okText="Yes"
              cancelText="No"
              placement="topLeft"
            >
              <Tooltip>
                <Button
                  type="text"
                  size="small"
                  danger
                  icon={<DeleteOutlined />}
                />
              </Tooltip>
            </Popconfirm>
          )}
        </Space>
      ),
    };

    return [...built, actionColumn];
  }, [actionConfig, columns, onDelete, onEdit, onView]);

  return (
    <div>
      {dataSource.length === 0 ? (
        <Typography.Text type="secondary" style={{ display: "block", textAlign: "center", padding: 16 }}>There are no notes available.</Typography.Text>
      ) : (
        <Table
          columns={finalColumns}
          dataSource={dataSource}
          rowKey={rowKey}
          loading={loading}
          pagination={pagination === false ? false : { ...defaultPagination, ...pagination }}
          scroll={{ x: 'max-content' }}
          size="middle"
          {...restProps}
        />
      )}
    </div>
  );
};