interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: string;
}

export const EmptyState = ({
  title = 'Empty',
  description = 'No items to display',
  icon,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      {icon && <div className="text-6xl mb-4">{icon}</div>}
      <div className="text-lg font-medium text-muted-foreground">{title}</div>
      {description && (
        <div className="text-sm text-muted-foreground mt-1">{description}</div>
      )}
    </div>
  );
};
