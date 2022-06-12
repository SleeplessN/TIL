# Process Sceduling

생성일: 2022년 5월 17일 오후 9:51

### CPU I/O Burst Cycle

: Process는 CPU burst 와 I/O burst를 반복하면서 수행

- CPU burst : CPU 명령을 수행하는 구간(Running)
- I/O burst : I/O event 발생을 기다리는 구간(Waiting)

1.  CPU-bound process : CPU burst > I/O burst

    : CPU를 얼마나 효율적으로 사용하는가가 중요

2.  I/O-bound process : CPU burst < I/O burst

    : 사용자에게 응답을 빠르게 해주는 게 중요

![Untitled](Process Sceduling-img/Untitled.png)

### 프로세스 스케줄링을 해야하는 이유?

하나의 프로세스가 아닌 다중 프로세스를 운영하게 될 경우, 프로세스들의 **우선 순위**를 조정해주는 일은 매우 중요하다. 중요한 일이라면 우선순위를 높여 자원을 할당해주어 먼저 처리해야하고, 상대적으로 우선순위가 낮은 프로세스는 후순위로 처리하여 효율적/효과적으로 업무를 수행할 필요가 있다. 즉, 프로세스 스케줄링은 **다중 프로그래밍(프로세스가 여러 개) 환경**에서 필요하다.

⇒ CPU가 쉬지않고 일을 하도록 해주는 역할

![Untitled](Process%20Sceduling%2071f80967aa4e44ca8dacbc90cd2ad90a/Untitled%201.png)

![Untitled](Process%20Sceduling%2071f80967aa4e44ca8dacbc90cd2ad90a/Untitled%202.png)

프로세스가 도착했을 때 기다리고 있다가 실행이 시작하기 전까지의 시간을 **"대기 시간"**

프로세스 도착 이후 작업이 수행되다가 첫 응답이 오기까지의 시간을 **"응답 시간"**

실제로 프로세스가 실행된 시간을 **"실행 시간"**

프로세스 도착 이후 원하는 일이 모두 끝난 시간을 **"반환 시간"**이라고 한다.

### Process Sceduling

CPU에서 실행될 프로세스를 **선택**하는 역할

### Dispatch

선택된 프로세스에게 CPU를 할당하는 역할

이어서 그 선택된 프로세스가 시작할 수 있도록 해주는 역할

Context switching / user mode - kernel mode 전환 / 실행되어야할 프로세스를 적절한 위치로 이동

### ※ Context Switching 이란

CPU가 한 개의 Task(Process / Thread) 를 실행하고 있는 상태에서 Interrupt 요청에 의해 다른 Task 로 실행이 전환되는 과정에서 기존의 Task 상태 및 Register 값들에 대한 정보 (Context)를 저장하고 새로운 Task 의 Context 정보로 교체하는 작업을 말한다.

여기서 Context란, CPU 가 다루는 Task(Process / Thread) 에 대한 정보로 대부분의 정보는 Register 에 저장되며 PCB(Process Control Block) 으로 관리된다.

여기서 Process 와 Thread 를 처리하는 ContextSwitching 은 조금 다른데, PCB는 OS에 의해 스케줄링되는 Process Control Block이고, Thread 의 경우 Process 내의 TCB(Task Control Block) 라는 내부 구조를 통해 관리된다.

Task 의 PCB 정보는 Process Stack, Ready Queue 라는 자료구조로 관리가 되며, Context Switching 시 PCB 의 정보를 바탕으로 이전에 수행하던 작업 혹은 신규 작업의 수행이 가능하게 된다.

PCB는 주로 다음과 같은 정보들을 저장하게 된다.

(1) Process State : 프로세스 상태

(2) Program Counter : 다음에 실행할 명령어 Address

(3) Register : 프로세스 레지스터 정보

(4) Process number : 프로세스 번호

### 스케줄링의 기준

1. CPU utilization : Overhead는 줄이고 CPU 이용률은 늘렸는지[CPU-bound process에서 중요]
2. Throughput : 단위시간 당 얼마나 많은 Process를 처리했는지[CPU-bound process에서 중요]
3. Turnaround time : process가 수행되는데 시간이 얼마나 소요되는지[I/O-bound process에서 중요]
4. Waiting time : ready queue에서 얼마나 기다리는지[I/O-bound process에서 중요]
5. Response time : 사용자 입장에서 명령어 입력 후 결과를 보기까지 얼마나 걸리는지[I/O-bound process에서 중요]

### 스케줄링의 단계

발생하는 빈도 및 할당 자원에 따라 그 단계를 구분하게 된다.

- Long-term Scheduling
  - 커널에 등록할 작업(job)을 결정한다.
- Mid-term Scheduling
  - 메모리 할당을 결정하는 것
- Short-term Scheduling
  - 저수준의 스케줄링
  - 프로세서(cpu)를 할당할 프로세스를 결정한다.
  - 즉 ready 상태에서 cpu를 할당하여 running 상태로 만들어주는 것과 같다.
  ![Untitled](Process%20Sceduling%2071f80967aa4e44ca8dacbc90cd2ad90a/Untitled%203.png)

### **선점(preemptive) VS 비선점(Non-preemptive)**

선점과 비선점의 차이는 누군가 빼앗을 수 있는지 여부에 그 차이가 있다.

### **Non-preemptive scheduling**

- 할당 받을 자원을 스스로 반납할 때 까지 사용 (뺏기지 않는다)
- 장점
  - Context switch overhead가 적다
- 단점
  - 평균 응답 시간 증가, 잦은 우선순위 역전
  - 하나가 끝날 때 까지 진행되기에, 다른 것들은 응답 시간이 길어지게 되고, 갑자기 급한 일이 생기더라도 기존의 작업 때문에 우선순위를 반영할 수 없다.

### **Preemptive scheduling**

- 타의에 의해 자원을 빼앗길 수 있다
- 장점
  - 응답성이 높아진다.
  - 시분할 시스템, 실시간 시스템에 적합하다
- 단점
  - Context switch overhead가 크다 = 시스템 부하가 크다
  - 데이터 일관성 문제가 발생할 수 있다.
    (이것때문에 critical section(임계구역), Mutex 등의 장치들이 필요)

### 스케줄링 알고리즘

1.  **FCFS(NON-PREEMPTIVE)**

    : CPU를 먼저 요청한 Process부터 실행

    - 장점 : Fair
    - 단점 : Convoy Effect 발생 가능(process time이 긴 process뒤에 있으면 waiting time이 길어짐)

    ![Untitled](Process%20Sceduling%2071f80967aa4e44ca8dacbc90cd2ad90a/Untitled%204.png)

2.  **Shortest Job First Scheduling(**Preemptive & Nonpreemptive)

    : 수행시간(CPU-burst)이 가장 짧은 process부터 수행

    - preemptive : 새 process가 들어오면 현재 실행중인 process의 남은 burst time을 가지고 다시 scheduling(SRTF)
    - non-preemptive : 실행중인 process가 끝나기를 기다림
    - 장점 : 최소의 평균 waiting time을 가지는 최적의 알고리즘
    - 단점 : CPU burst의 크기를 예측할 수 없어 컴퓨터에서는 쓸 수 없음

    ![Untitled](Process%20Sceduling%2071f80967aa4e44ca8dacbc90cd2ad90a/Untitled%205.png)

3.  **Priority Scheduling(**Preemptive & Nonpreemptive)

    : 프로세스마다 우선순위를 정해줘서 프로세스를 진행한다.

    - 단점 : 우선순위가 낮은 프로세스는 수행이 안될 수 있다(Starvation)

    ⇒ aging을 통해 시간이 지남에 따라 priority를 높여준다.

    ![Untitled](Process%20Sceduling%2071f80967aa4e44ca8dacbc90cd2ad90a/Untitled%206.png)

4.  **Round-Robin Scheduling**

    : FCFS랑 유사한데 preempt를 가능하게 한 것이다.

    CPU scheduler가 ready queue를 돌면서 한번에 한 process에게 1 time quantum동안 CPU 할당

    - 장점 : waiting time, response time 측면에서 좋은 알고리즘
    - 단점 : time quantum이 너무 작으면 context switch overhead 증가
                : time quantum이 너무 크면 convey effect 발생

    * A rule of thumb : CPU burst의 80%는 time quantum보다 작아야 함

    ![Untitled](Process%20Sceduling%2071f80967aa4e44ca8dacbc90cd2ad90a/Untitled%207.png)

5.  **Multilevel Queue Scheduling**

    : ready queue가 여러 level로 존재함

    ⇒ 각 queue는 별도의 scheduling algorithm을 가지고 있음

    ⇒ queue 간에는 priority scheduling algorithm 알고리즘 사용

    ![Untitled](Process%20Sceduling%2071f80967aa4e44ca8dacbc90cd2ad90a/Untitled%208.png)

6.  **Multilevel feedback queue scheduling**(**MLFQ**)

    : Priority + RR / 현재 OS에서 사용하는 방식

    시행 순서

    처음에 모든 Process가 동일한 queue에 들어감

    -> 주어진 time quantum안에 끝나지 않으면 아래로, 끝나면 위로 이동

    -> 아래에 있는 queue는 위에 있는 다른 queue들이 비어있을 때만 수행

    - 장점 : 공평하면서도 성능이 우수한 알고리즘

Ref : [https://zoomkoding.github.io/os/2019/04/28/os-5.html](https://zoomkoding.github.io/os/2019/04/28/os-5.html)

[https://ko.wikipedia.org/wiki/스케줄링\_(컴퓨팅)](<https://ko.wikipedia.org/wiki/%EC%8A%A4%EC%BC%80%EC%A4%84%EB%A7%81_(%EC%BB%B4%ED%93%A8%ED%8C%85)>)

[https://www.studytonight.com/operating-system/process-scheduling](https://www.studytonight.com/operating-system/process-scheduling)
