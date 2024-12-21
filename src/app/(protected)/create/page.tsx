"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UseRefetch from "@/hooks/use-refetch";
import { api } from "@/trpc/react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
type FormInput = {
  projectName: string;
  repoUrl: string;
  githubToken?: string;
};
const CreatePage = () => {
  const { register, handleSubmit, reset } = useForm<FormInput>();
  const createProject = api.project.createProject.useMutation()
  const refetch = UseRefetch()
  function onSubmit(data: FormInput) {
    // window.alert(JSON.stringify(data, null, 2))
    createProject.mutate({
      name: data.projectName,
      githubUrl: data.repoUrl,
      githubToken: data.githubToken
    }, {
      onSuccess: () => {
        toast.success('Project created successfully')
        refetch()
        reset()
      },
      onError: () => {
        toast.error('Failed to create project')
      }
    })
    return true
  }
  return (
    <div className="flex h-full items-center justify-center gap-12">
      <img src="/undraw_github.svg" className="h-56 w-auto" />
      <div>
        <div>
          <h1 className="text-2xl font-semibold">
            Link Your Github Repository
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter the url of your repository to link it to Chat Sphere
          </p>
        </div>
        <div className="h-4"></div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
          <Input 
              {...register('projectName', {required: true})}
              placeholder="ProjectName"
            />
            <div className="h-2"></div>
            <Input 
              {...register('repoUrl', {required: true})}
              type="url"
              placeholder="Github Url"
            />
            <div className="h-2"></div>
            <Input 
              {...register('githubToken')}
              placeholder="Github Token (Optional)"
            />
            <div className="h-4"></div>
            <Button type="submit" disabled={createProject.isPending}>Create Project</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
