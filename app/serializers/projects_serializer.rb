class ProjectsSerializer
  include FastJsonapi::ObjectSerializer

  attributes :title, :tasks
end
